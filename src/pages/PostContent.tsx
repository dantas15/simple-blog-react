import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  LoadingOverlay,
  Textarea,
  Title,
} from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

import { Comments } from '../components/Comments';
import { CommentWithUser } from '../interfaces/Comment';
import { PostWithComments } from '../interfaces/Post';
import { AuthContext } from '../contexts/AuthContext';

import api from '../services/api';

type PostReturnType = { data: PostWithComments };
type CommentsReturnType = { data: CommentWithUser[] };
type CreateCommentReturnType = { data: CommentWithUser };

export function PostContent() {
  const { authenticated } = useContext(AuthContext);
  const [loadingComments, setLoadingComments] = useState(false);

  const [post, setPost] = useState<PostWithComments>();
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  const [newCommentString, setNewCommentString] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const slug = params.slug;

  useEffect(() => {
    (async () => {
      try {
        setLoadingComments(true);
        const response = await api.get<PostReturnType>(`/posts/${slug}`);
        const postId = response.data.data.id;
        setPost(response.data.data);
        try {
          const response = await api.get<CommentsReturnType>(
            `/posts/${postId}/comments`,
          );
          setComments(response.data.data);
          setLoadingComments(false);
        } catch {
          setLoadingComments(false);
          showNotification({
            title: 'Error!',
            message: 'No comment was found',
            icon: <IconX size={18} />,
            color: 'red',
          });
        }
      } catch {
        showNotification({
          title: 'Error!',
          message: 'The post was not found',
          icon: <IconX size={18} />,
          color: 'red',
        });
      }
    })();
  }, [slug]);

  const handleCreateNewComment = async (event: FormEvent) => {
    event.preventDefault();

    if (!post) {
      console.log('Post not found');
      return;
    }

    if (!authenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await api.post<CreateCommentReturnType>(
        `/comments/${post.id}`,
        {
          content: newCommentString,
        },
      );
      setComments([...comments, response.data.data]);
      setNewCommentString('');
      showNotification({
        title: 'Success!',
        message: 'The comment was created',
        icon: <IconCheck size={18} />,
        color: 'lime',
      });
    } catch {
      showNotification({
        title: 'Error!',
        message: 'The comment was not created',
        icon: <IconX size={18} />,
        color: 'red',
      });
    }
  };

  const handleChangeNewComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentString(event.target.value);
  };

  const handleDeleteComment = async (commentToDeleteId: string) => {
    try {
      await api.delete(`/comments/${commentToDeleteId}`);

      showNotification({
        title: 'Success!',
        message: 'The comment has been deleted successfully',
        icon: <IconCheck size={18} />,
        color: 'lime',
      });
      const commentsWithoutDeletedOne = comments.filter((comment) => {
        return comment.id !== commentToDeleteId;
      });
      setComments(commentsWithoutDeletedOne);
    } catch {
      showNotification({
        title: 'Error!',
        message: 'The comment could not be deleted',
        icon: <IconX size={18} />,
        color: 'red',
      });
    }
  };

  const isNewCommentEmpty = newCommentString.length === 0;

  return (
    <Container mt={20} mb={30}>
      {!post ? (
        <div style={{ width: '100%', height: '100%' }}>
          <LoadingOverlay visible={true} overlayBlur={2} />
        </div>
      ) : (
        <>
          <Title>{post.title}</Title>

          <Divider mt={16} />

          <Container size={'sm'} my={32}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Container>

          <Divider title="Comments" mb={16} />
          <div>
            <LoadingOverlay visible={loadingComments} overlayBlur={2} />

            <form
              onSubmit={handleCreateNewComment}
              style={{ marginBottom: '1.5rem' }}
            >
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

            {comments.length > 0 && (
              <Comments
                comments={comments}
                handleDelete={handleDeleteComment}
              />
            )}
          </div>
        </>
      )}
    </Container>
  );
}
