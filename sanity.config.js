// Letter schema
const letter = {
    name: 'letter',
    title: '', // Remove "Letter" title
    type: 'document',
    fields: [
        {
            name: 'number',
            title: 'Letter Number',
            type: 'number',
            hidden: true, // Hide from interface but keep functional
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
            hidden: true, // Hide from interface
            initialValue: () => new Date().toISOString(),
            readOnly: true,
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
                title: `Letter ${number}`, // Show "Letter X" instead of "Untitled"
                subtitle: title || 'Draft' // Show title as subtitle
            }
        }
    }
}