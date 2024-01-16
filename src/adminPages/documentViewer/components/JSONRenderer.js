import React, { useState } from 'react';

const DataTypeColors = {
  string: 'text-green-500',
  number: 'text-blue-500',
  boolean: 'text-red-500',
  object: 'text-purple-500',
  array: 'text-yellow-500',
  null: 'text-gray-500',
};

const CollapsibleArray = ({ data, indent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`pl-4 ${DataTypeColors.array} font-mono`}>
      <span onClick={() => setIsCollapsed(!isCollapsed)} className="cursor-pointer font-mono">
        {isCollapsed ? '[...]' : '['}
      </span>
      {!isCollapsed && (
        <>
          {data.map((item, index) => (
            <div key={index} className="pl-4">
              <JsonRenderer data={item} indent={indent + 1} />
              {index < data.length - 1 ? ',' : ''}
            </div>
          ))}
          ]
        </>
      )}
    </div>
  );
};

const JsonRenderer = ({ data, indent = 0 }) => {
  if (data === null) {
    return <span className={DataTypeColors.null}>null</span>;
  } else if (typeof data === 'string') {
    return <span className={DataTypeColors.string}>"{data}"</span>;
  } else if (typeof data === 'number') {
    return <span className={DataTypeColors.number}>{data}</span>;
  } else if (typeof data === 'boolean') {
    return <span className={DataTypeColors.boolean}>{data.toString()}</span>;
  } else if (Array.isArray(data)) {
    return <CollapsibleArray data={data} indent={indent} />;
  } else if (typeof data === 'object') {
    return (
      <div className={`pl-4 ${DataTypeColors.object}`}>
        {'{'}
        {Object.entries(data).map(([key, value], index, array) => (
          <div key={key} className="flex">
            <span className="text-orange-500 font-mono">"{key}": </span>
            <JsonRenderer data={value} indent={indent + 1} />
            {index < array.length - 1 ? ',' : ''}
          </div>
        ))}
        {'}'}
      </div>
    );
  } else {
    return <span>{data}</span>;
  }
};


export default JsonRenderer;
