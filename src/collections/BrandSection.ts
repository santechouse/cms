import { CollectionConfig } from 'payload'

export const BrandSection: CollectionConfig = {
  slug: 'brand-section',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'brands',
      label: 'Brands',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          label: 'Brand Name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'logo',
          label: 'Logo',
          type: 'relationship',
          relationTo: 'media',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
