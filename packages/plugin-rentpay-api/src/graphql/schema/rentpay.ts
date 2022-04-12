export const types = ({ cardsEnabled, formsEnabled }) => {
  return `
    type DealRP {
      _id: String
      name: String
      products: JSON
      customFieldsData: JSON
      assignedUsers: JSON
      stage: JSON
    }

    type DealsForRentpayResponse {
      list: [DealRP]
      totalCount: Int
    }

    ${
      formsEnabled
        ? `extend type Field @key(fields: "_id") {
        _id: String! @external
        }`
        : ""
    }

    ${
      cardsEnabled
        ? `
        extend type Deal @key(fields: "_id") {
          _id: String! @external
        }
       `
        : ""
    }
  `;
};

const listQueryParams = `
    searchValue: String
    ids: [String]
    customerIds: [String]
    buyerIds: [String]
    waiterIds: [String]
    priceRange: String
    district: String
    customFields: JSON
    stageOrder: Int
    limit: Int
    skip: Int
 `;

export const queries = ({ formsEnabled, cardsEnabled }) => `
 dealsForRentpay(${listQueryParams}): DealsForRentpayResponse
 fieldsForRentpay(contentType: String!, code: String, searchable: Boolean): ${
   formsEnabled ? "[Field]" : "JSON"
 }
 dealDetailForRentpay(_id: String!): ${cardsEnabled ? "Deal" : "JSON"}
`;

export const mutations = `
 modifyWaiterCustomerList(dealId: String, customerId: String, type: String): [String]
`;