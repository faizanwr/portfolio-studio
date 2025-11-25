import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: {
                hotspot: true,
            },
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
                    { title: 'App', value: 'app' },
                    { title: 'Web', value: 'web' },
                    { title: 'Brand', value: 'brand' },
                    { title: 'Other', value: 'other' },
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
                    { title: 'Development', value: 'development' },
                    { title: 'Design', value: 'design' },
                    { title: 'Product', value: 'product' },
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
                    options: { hotspot: true },
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
