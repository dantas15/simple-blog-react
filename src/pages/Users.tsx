import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Title,
  Divider,
} from '@mantine/core';
// import { IconPencil, IconTrash } from '@tabler/icons';
import { User } from '../interfaces/User';

export function Users() {
  const data: User[] = [
    {
      id: '123',
      name: 'John Doe',
      email: 'john@test.com',
      is_admin: false,
      created_at: '2020-01-01',
      updated_at: '2020-01-01',
    },
  ];

  const theme = useMantineTheme();
  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Text size="sm" weight={500}>
          {item.name}
        </Text>
      </td>

      <td>
        <Badge
          color={item.is_admin ? 'lime' : 'red'}
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {item.is_admin ? 'Admin' : 'User'}
        </Badge>
      </td>
      <td>
        <Anchor<'a'>
          size="sm"
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          {item.email}
        </Anchor>
      </td>
      {/* <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td> */}
    </tr>
  ));

  return (
    <>
      <Title>Users</Title>

      <Divider my={15} />

      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Admin</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
