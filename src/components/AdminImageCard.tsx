import {
  createStyles,
  Card,
  Image,
  Avatar,
  Text,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconEditCircle, IconTrash, IconTrashOff } from '@tabler/icons';
import { useNavigate } from 'react-router';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

interface AdminImageCardProps {
  title: string;
  content: string;
  date: string;
}

export function AdminImageCard({ title, content, date }: AdminImageCardProps) {
  const { classes } = useStyles();

  const navigate = useNavigate();

  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <div className={classes.body}>
          <Text className={classes.title} mt="xs" mb="md">
            {title}
          </Text>
          <Group noWrap spacing="xs">
            <Group>
              <ActionIcon
                size={20}
                variant="filled"
                color={'blue'}
                onClick={() => navigate('edit/123')}
              >
                <IconEditCircle size={14} />
              </ActionIcon>
              <ActionIcon
                size={20}
                variant="filled"
                color={'red'}
                onClick={() => console.log('delete')}
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              Data: {date}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
