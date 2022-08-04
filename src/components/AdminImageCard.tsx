import {
  createStyles,
  Card,
  Text,
  Group,
  ActionIcon,
  LoadingOverlay,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconEditCircle, IconTrash, IconX } from '@tabler/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../services/api';

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
  id: string;
  slug: string;
  title: string;
  date: string;
}

export function AdminImageCard({ id, slug, title, date }: AdminImageCardProps) {
  const [loading, setLoading] = useState(false);

  const { classes } = useStyles();

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      setLoading(true);
      await api.delete(`/posts/${id}`);
      navigate(0);
    } catch (e) {
      showNotification({
        title: 'Error!',
        message: "Couldn't delete the post",
        icon: <IconX size={18} />,
        color: 'red',
      });
      console.error(e);
    }

    setLoading(false);
  }

  dayjs.extend(utc);

  const postDate = dayjs.utc(date).local().format('DD-MM-YYYY [às] HH:mm');

  return (
    <Card withBorder radius="md" p={0} mb={4} className={classes.card}>
      <LoadingOverlay visible={loading} overlayBlur={2} />
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
                onClick={() => navigate(`/app/post?slug=${slug}`)}
              >
                <IconEditCircle size={14} />
              </ActionIcon>
              <ActionIcon
                size={20}
                variant="filled"
                color={'red'}
                onClick={handleDelete}
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {postDate}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
