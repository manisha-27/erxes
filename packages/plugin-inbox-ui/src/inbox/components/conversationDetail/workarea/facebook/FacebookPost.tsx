import * as React from 'react';

import { FormControl } from '@erxes/ui/src/components/form';
import NameCard from '@erxes/ui/src/components/nameCard/NameCard';
import { ICustomer } from '@erxes/ui/src/customers/types';
import Date from './Date';
import FacebookContent from './FacebookContent';
import { Counts, PostContainer, User } from './styles';
import UserName from '@erxes/ui-inbox/src/components/conversationDetail/workarea/facebook/UserName';
import { IFacebookPost } from '@erxes/ui-inbox/src/types';

type Props = {
  post: IFacebookPost;
  commentCount: number;
  customer: ICustomer;
  scrollBottom: () => void;
  onToggleClick: () => void;
  isResolved: boolean;
};

export default class FacebookPost extends React.Component<Props, {}> {
  renderCounts(commentCount: number) {
    return (
      <Counts>
        <span>{commentCount} Comments</span>

        <FormControl
          componentClass='checkbox'
          onChange={this.props.onToggleClick}
          checked={this.props.isResolved}
        >
          Show resolved comments
        </FormControl>
      </Counts>
    );
  }

  render() {
    const { post, customer, scrollBottom, commentCount } = this.props;

    if (!post) {
      return null;
    }

    return (
      <PostContainer>
        <NameCard.Avatar customer={customer} />

        <User isPost={true}>
          <UserName
            username={`${customer.firstName} ${customer.lastName || ''}`}
            userId={post.senderId}
          />
          <span>
            <Date
              type='post'
              timestamp={post.timestamp}
              permalink_url={post.permalink_url}
            />
          </span>
        </User>

        <FacebookContent
          content={post.content}
          attachments={post.attachments}
          scrollBottom={scrollBottom}
        />
        <div>{this.renderCounts(commentCount)}</div>
      </PostContainer>
    );
  }
}
