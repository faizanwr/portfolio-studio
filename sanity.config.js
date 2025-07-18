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
            readOnly: true,
            initialValue: async (doc, context) => {
                const { getClient } = context
                const client = getClient({ apiVersion: '2023-10-10' })
                const letters = await client.fetch('count(*[_type == "letter"])')
                return letters + 1
            },
            validation: Rule => Rule.required()
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
            initialValue: () => new Date().toISOString(),
            readOnly: ({ document }) => {
                // Read-only if document already exists (has _id)
                return !!document?._id
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'image',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
                crop: true,
                sources: [
                    {
                        name: 'square',
                        title: 'Square (1:1)',
                        aspectRatio: 1
                    }
                ]
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string'
                }
            ]
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'Quote', value: 'blockquote' }
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Number', value: 'number' }
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Underline', value: 'underline' }
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
            const { title, number, media } = selection
            return {
                title: `${number}. ${title}`,
                media: media
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