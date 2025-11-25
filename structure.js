import { structureTool } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure = (S, context) =>
    S.list()
        .title('Content')
        .items([
            // Orderable projects
            orderableDocumentListDeskItem({
                type: 'project',
                title: 'Projects',
                icon: () => '📁',
                S,
                context,
            }),
            // Default list for letters
            S.documentTypeListItem('letter').title('Letters'),
        ])
