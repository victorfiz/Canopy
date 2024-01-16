import {formatDate} from './formatDate'

export function formatTemplateCollection({
    templates
}){
    console.log("templates", templates)
    let templatesRows = [];
    let templateIds = [];
    templates.forEach((template) => {
        templateIds.push(template.templateId)
        templatesRows.push([template.title, 
            formatDate(template.timestamp), 
            template.tags?.join(', '),
            template.questions?.length || 0, 
            "#"
        ])
    })
    return {templatesRows}


}