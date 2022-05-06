import { ImBooks, ImUsers } from 'react-icons/im';

export const SidebarItems = [
    {
        title: 'Accounts',
        path: '/accounts',
        icon: <ImUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Books Lending',
        path: '/books',
        icon: <ImBooks />,
        cName: 'nav-text'
    },
]