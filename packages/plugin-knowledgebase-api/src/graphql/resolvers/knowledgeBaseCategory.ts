import { PUBLISH_STATUSES } from '../../models/definitions/constants';
import { ICategoryDocument } from '../../models/definitions/knowledgebase';
import { getDocumentList } from '../../cacheUtils';
import { IContext } from '../../connectionResolver';

export const KnowledgeBaseCategory = {
  articles(category: ICategoryDocument, _args, { models }: IContext) {
    return models.KnowledgeBaseArticles.find({
      categoryId: category._id,
      status: PUBLISH_STATUSES.PUBLISH,
    }).sort({
      createdDate: -1,
    });
  },

  async authors(category: ICategoryDocument, _args, { models, coreModels }: IContext) {
    const articles = await models.KnowledgeBaseArticles.find(
      {
        categoryId: category._id,
        status: PUBLISH_STATUSES.PUBLISH,
      },
      { createdBy: 1 }
    );

    const authorIds = articles.map((article) => article.createdBy);

    return getDocumentList(coreModels, 'users', {
      _id: { $in: authorIds },
    });
  },

  firstTopic(category: ICategoryDocument, _args, { models }: IContext) {
    return models.KnowledgeBaseTopics.findOne({ _id: category.topicId });
  },

  numOfArticles(category: ICategoryDocument, _args, { models }: IContext) {
    return models.KnowledgeBaseArticles.find({
      categoryId: category._id,
      status: PUBLISH_STATUSES.PUBLISH,
    }).countDocuments();
  },
};

export const KnowledgeBaseParentCategory = {
  ...KnowledgeBaseCategory,

  childrens(category: ICategoryDocument, _args, { models }: IContext) {
    return models.KnowledgeBaseCategories.find({
      parentCategoryId: category._id,
    }).sort({ title: 1 });
  },
};