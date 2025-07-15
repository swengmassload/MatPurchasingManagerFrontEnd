
interface SideBarIconsProps {
  url: string;
  alt?: string;
}
const SideBarIcons = ({ url }: SideBarIconsProps) => {
  return (
      <img
        src={url}
        style={{ width: "24px", height: "24px" }}
        alt="Custom Icon"
      />
  );
};

export default SideBarIcons;
