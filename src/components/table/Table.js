import React, { useRef, useCallback } from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';


function Table({
    headings,
    rows,
    tableContainerClassName = "",
    setSelectedElements=()=>{},
    widths = Array(14).fill("200px"),
    rowsHeight = "auto",
    onRowBottomReached = () => { },
    selectedElements = [],
}) {
    const containerRef = useRef();

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const bottomReached = scrollTop + clientHeight >= scrollHeight - 5; // 5 is a threshold in pixels
        if (bottomReached) {

            onRowBottomReached();
        }
    }, []);

    return (
        <div className={`table-container ${tableContainerClassName} flex-grow flex flex-col`}>
            <TableHead
                headings={headings}
                widths={widths}
                selectedElements={selectedElements}
                setSelectedElements={setSelectedElements}
                rows={rows}
            />
            <div
                className="overflow-y-scroll table-rows-container"
                style={{
                    height: rowsHeight,
                    maxHeight: rowsHeight,
                }}
                onScroll={handleScroll}
                ref={containerRef}
            >
                {rows.map((row, index) => (
                    <TableRow
                        key={index}
                        row={row}
                        widths={widths}
                        setSelectedElements={setSelectedElements}
                        selectedElements={selectedElements}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

export default Table;
