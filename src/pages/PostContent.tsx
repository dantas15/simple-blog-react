import {
  Button,
  Container,
  Divider,
  Group,
  Textarea,
  Title,
} from '@mantine/core';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Comments } from '../components/Comments';
import { CommentWithUser } from '../interfaces/Comment';
import { Post, PostWithComments } from '../interfaces/Post';

export function PostContent() {
  const [post, setPost] = useState<Post>({
    id: '123',
    title: 'Hello world',
    content: '<ul><li>oi</li></ul>',
    slug: 'hello-world',
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
    user_id: '123',
  });
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [newCommentString, setNewCommentString] = useState('');

  const params = useParams();

  useEffect(() => {
    // alert('slug: ' + params.slug);
  }, [params.slug]);

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault();

    // setComments([...comments, newCommentString]);

    // setNewCommentString('');
  };

  const handleChangeNewComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentString(event.target.value);
  };

  const deleteComment = (commentToDeleteId: string) => {
    // const commentsWithoutDeletedOne = comments.filter((comment) => {
    //   return comment !== commentToDelete;
    // });
    // setComments(commentsWithoutDeletedOne);
  };

  const isNewCommentEmpty = newCommentString.length === 0;

  return (
    <Container mt={20} mb={30}>
      <Title>{post.title}</Title>

      <Divider mt={16} />

      <Container size={'sm'} my={32}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>

      <Divider title="Comments" mb={16} />

      <form onSubmit={handleCreateNewComment}>
        <Title order={6}>Leave your feedback</Title>

        <Textarea
          value={newCommentString}
          onChange={handleChangeNewComment}
          placeholder="Leave your comment here"
          required
        />
        <Button type="submit" disabled={isNewCommentEmpty} mt={8}>
          Comment
        </Button>
      </form>

      {comments.length > 0 && <Comments comments={comments} />}
    </Container>
  );
}
