import { CommentWithUser } from '../interfaces/Comment';
import { createStyles, Text, Group, Divider, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

interface CommentsProps {
  comments: CommentWithUser[];
  handleDelete: (commentId: string) => Promise<void>;
}

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

export function Comments({ comments, handleDelete }: CommentsProps) {
  const { classes } = useStyles();

  dayjs.extend(utc);

  function formatDate(date: string) {
    return dayjs.utc(date).local().format('DD-MM-YYYY [às] HH:mm');
  }

  return (
    <>
      {comments.map(({ user, created_at, content, id }, index) => (
        <div key={id}>
          <Group position="apart">
            <div>
              <Text size="sm">{user.name}</Text>
              <Text size="xs" color="dimmed">
                {formatDate(created_at)}
              </Text>
            </div>
            <div>
              <ActionIcon
                color={'red'}
                title={'Delete comment'}
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </div>
          </Group>
          <Text className={classes.body} size="sm">
            {content}
          </Text>
          {index !== comments.length - 1 && <Divider mt={8} mb={16} />}
        </div>
      ))}
    </>
  );
}
