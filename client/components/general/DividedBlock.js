import { Divider } from "antd";

const DividedBlock = ({ children, title }) => {
  return (
    <div className={"md5"}>
      <Divider orientation="left" plain>
        {title}
      </Divider>
      {children}
    </div>
  );
};

export default DividedBlock;
