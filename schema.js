
import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
{
  categories(filters:{}){
    items{
      name
      id
    }
  }
}
`;

export const GET_PRODUCT_BY_CATEGORY = gql`
  query getCategories($categoryId: Int!) {
    category(id: $categoryId) {
        name
        products(pageSize: 40, currentPage: 1, sort: {}) {
          items {
            name
            sku
            stock_status
            image {
                url
            }
          }
          page_info {
            total_pages
          }
          total_count
        }
      }
  }
`;

export const GET_PRODUCT_BY_SKU = gql`
    query getProduct($sku: String!) {
        products(
            filter: { 
                sku: {
                    eq: $sku
                } 
            }
        ) {
            items {
                id
                name
                description {
                    html
                }
                image {
                    url
                }
                price_range {
                    minimum_price {
                      regular_price {
                        currency
                        value
                      }
                    }
                    maximum_price {
                      regular_price {
                        currency
                        value
                      }
                    }
                }
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`

export const SUBSCRIBE = gql`
    mutation emailSubscribe($email: String!) {
        subscribe(input: {email: $email}) {
            status {
                code
                message
                response
            }
        }
    }
`

export default SUBSCRIBE;