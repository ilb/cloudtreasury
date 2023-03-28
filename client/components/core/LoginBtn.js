import { signOut, useSession } from 'next-auth/react';
import { Button, Dropdown, List } from 'antd';
import { useRouter } from 'next/router';

const LoginBtn = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const menu = (
		<List bordered>
			<Button
				className="auth-btn"
				onClick={() => signOut({ redirect: false }).then(() => router.push('/signin'))}>
				Logout
			</Button>
		</List>
	);

	if (session) {
		return (
			<>
				<Dropdown overlay={menu} className="sidebar-logout" placement="bottomRight" arrow>
					<Button>{session.user.login}</Button>
				</Dropdown>
			</>
		);
	}

	return (
		<>
			<Button className="auth-btn" onClick={() => router.push('/signin')}>
				Login
			</Button>
		</>
	);
};

export default LoginBtn;
