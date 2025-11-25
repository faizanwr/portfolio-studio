import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            description: 'Project icon/logo (recommended: 512x512px, max 500KB)',
            type: 'image',
            options: {
                hotspot: true,
                accept: 'image/png, image/jpeg, image/webp',
                metadata: ['blurhash', 'lqip', 'palette'],
            },
            validation: (Rule) =>
                Rule.required()
                    .assetRequired()
                    .custom((value) => {
                        if (!value?.asset) return true
                        // File size validation happens on upload
                        return true
                    })
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'designType',
            title: 'Design Type',
            type: 'string',
            options: {
                list: [
                    { title: 'App', value: 'App' },
                    { title: 'Web', value: 'Web' },
                    { title: 'Brand', value: 'Brand' },
                    { title: 'Other', value: 'Other' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Development', value: 'Development' },
                    { title: 'Design', value: 'Design' },
                    { title: 'Product', value: 'Product' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
            initialValue: () => new Date().getFullYear(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'released',
            title: 'Released',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'externalUrl',
            title: 'External URL',
            type: 'url',
            hidden: ({ document }) => !document?.released,
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    title: 'Image',
                    description: 'Content image (recommended: 16:9 aspect ratio, max 2MB)',
                    options: {
                        hotspot: true,
                        accept: 'image/png, image/jpeg, image/webp',
                        metadata: ['blurhash', 'lqip', 'palette', 'exif'],
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            description: 'Important for SEO and accessibility',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'icon',
        },
    },
})
