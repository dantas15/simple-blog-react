import { CommentWithUser } from '../interfaces/Comment';
import { createStyles, Text, Group } from '@mantine/core';

interface CommentsProps {
  comments: CommentWithUser[];
}

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

export function Comments({ comments }: CommentsProps) {
  const { classes } = useStyles();

  return (
    <>
      {comments.map(({ user, created_at, content, id }) => (
        <div key={id}>
          <Group>
            <div>
              <Text size="sm">{user.name}</Text>
              <Text size="xs" color="dimmed">
                {created_at}
              </Text>
            </div>
          </Group>
          <Text className={classes.body} size="sm">
            {content}
          </Text>
        </div>
      ))}
    </>
  );
}
