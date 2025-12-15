import { CollectionConfig } from 'payload'

export const Banner: CollectionConfig = {
  slug: 'banners',
  fields: [
    {
      name: 'link',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      localized: true,
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      required: true,
    },
  ],
}
