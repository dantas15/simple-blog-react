import { ActionIcon, Divider, Group, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { AdminImageCard } from '../components/AdminImageCard';

export function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <Group grow>
        <Title>Seus posts</Title>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row-reverse',
          }}
        >
          <ActionIcon
            color={'green'}
            variant="outline"
            onClick={() => navigate('create')}
          >
            <IconPlus />
          </ActionIcon>
        </div>
      </Group>

      <Divider my={15} />

      <AdminImageCard content="asdsads" date="1232" title="oi" />
    </>
  );
}
