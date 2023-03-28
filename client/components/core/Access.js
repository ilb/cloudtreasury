import { useSession } from 'next-auth/react';

const Access = ({ children, permission }) => {
  const { data: session } = useSession();
  const userPermissions = session?.user?.relationMembers[0] && session?.user?.relationMembers[0]?.role?.permissions?.map(permission => permission.code) || [];

  return (
    <>{userPermissions.includes(permission) && children}</>
  )
};

export default Access;