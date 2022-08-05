import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconChevronDown } from '@tabler/icons';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor,
    }).background,
    borderBottom: `1px solid ${
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background
    }`,
    // marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
        0.1,
      ),
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      0.1,
    ),
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: 38,
    color: theme.white,
    backgroundColor: 'transparent',
    borderColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor,
    }).background,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
        0.1,
      ),
    },

    '&[data-active]': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
        0.1,
      ),
      borderColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
    },
  },
}));

export function Navbar() {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(true);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Must be inside AuthContextProvider');
  }

  const { authenticated, userIsAdmin, userName, handleLogout } = authContext;

  const tabs = [{ label: 'Home', link: '/' }];

  if (!authenticated) {
    tabs.push({ label: 'Login', link: '/login' });
  }

  if (userIsAdmin) {
    tabs.push({ label: 'Admin', link: '/app' });
  }

  const items = tabs.map((tab) => (
    <Tabs.Tab
      value={tab.link}
      key={tab.link}
      onClick={() => navigate(tab.link)}
    >
      {tab.label}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color={theme.white}
          />

          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            {authenticated && (
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Avatar src={''} alt={''} radius="xl" size={20} />
                    <Text
                      weight={500}
                      size="sm"
                      sx={{ lineHeight: 1, color: theme.white }}
                      mr={3}
                    >
                      {userName}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
            )}
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                icon={<IconLogout size={14} stroke={1.5} />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          variant="outline"
          style={{
            display: theme.fn.smallerThan('sm')
              ? opened
                ? 'block'
                : 'none'
              : 'block',
          }}
          classNames={{
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
