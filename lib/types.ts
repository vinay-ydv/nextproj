export interface AITool {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: Category
  pricing: PricingType
  website: string
  logo: string
  features: string[]
  useCases: string[]
  rating: number
  reviewCount: number
  launchDate: string
  isFeatured: boolean
  isNew: boolean
  tags: string[]
}

export type Category =
  | 'Writing'
  | 'Image Generation'
  | 'Code Assistant'
  | 'Video'
  | 'Audio'
  | 'Productivity'
  | 'Marketing'
  | 'Data Analysis'
  | 'Customer Support'
  | 'Education'

export type PricingType = 'Free' | 'Freemium' | 'Paid' | 'Enterprise'

export interface CategoryInfo {
  name: Category
  slug: string
  description: string
  count: number
}
