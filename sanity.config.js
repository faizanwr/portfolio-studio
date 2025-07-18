// sanity.config.js
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Letter schema
const letter = {
    name: 'letter',
    title: ' ', // Remove "Letter" title
    type: 'document',
    fields: [
        {
            name: 'number',
            title: 'Letter Number',
            type: 'number',
<<<<<<< HEAD
            hidden: true, // Hide from interface but keep functional
            readOnly: true,
            initialValue: async (doc, context) => {
                const { getClient } = context
                const client = getClient({ apiVersion: '2023-10-10' })
                const letters = await client.fetch('count(*[_type == "letter"])')
                return letters + 1
            },
            validation: Rule => Rule.required()
=======
            validation: Rule => Rule.required().min(1)
>>>>>>> parent of 8169318e (test the changes to make it more robust)
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
            hidden: true, // Hide from interface
            initialValue: async (doc, context) => {
                const { getClient } = context
                const client = getClient({ apiVersion: '2023-10-10' })
                const letters = await client.fetch('count(*[_type == "letter"])')
                const letterNumber = letters + 1
                return {
                    current: letterNumber.toString()
                }
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
<<<<<<< HEAD
            hidden: true, // Hide from interface
            initialValue: () => new Date().toISOString(),
            readOnly: true,
=======
>>>>>>> parent of 8169318e (test the changes to make it more robust)
            validation: Rule => Rule.required()
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
<<<<<<< HEAD
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
=======
                hotspot: true
            }
>>>>>>> parent of 8169318e (test the changes to make it more robust)
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
            hidden: true, // Hide from interface
            initialValue: 0,
            readOnly: true
        }
    ],
    preview: {
        select: {
            title: 'title',
            number: 'number'
        },
        prepare(selection) {
            const { title, number } = selection
            return {
<<<<<<< HEAD
                title: '🍉 Next great letter waiting!', // Static encouraging text
                subtitle: ' ', // Remove subtitle completely
                media: null // Remove any media preview
=======
                title: `${number}. ${title}`
>>>>>>> parent of 8169318e (test the changes to make it more robust)
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