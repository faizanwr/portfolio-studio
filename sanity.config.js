// sanity.config.js
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Letter schema
const letter = {
    name: 'letter',
    title: 'Letter',
    type: 'document',
    fields: [
        {
            name: 'number',
            title: 'Letter Number',
            type: 'number',
            validation: Rule => Rule.required().min(1)
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            validation: Rule => Rule.required()
        },
        {
            name: 'image',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' }
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        {
            name: 'views',
            title: 'Views',
            type: 'number',
            initialValue: 0,
            readOnly: true
        }
    ],
    preview: {
        select: {
            title: 'title',
            number: 'number',
            media: 'image'
        },
        prepare(selection) {
            const { title, number } = selection
            return {
                title: `${number}. ${title}`
            }
        }
    }
}

export default defineConfig({
    name: 'default',
    title: 'Portfolio Studio',

    projectId: 'slncaqgc',
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: [letter],
    },
})