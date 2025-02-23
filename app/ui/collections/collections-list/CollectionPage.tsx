import CollectionList from "./CollectionList";
import { CreateButton } from "./CreateButton";

export function CollectionPage() {
  return (
    <CollectionPageContainer>
      <CollectionTitle />
      <CollectionList className="w-5/6 m-4" />
      <CreateButton />
    </CollectionPageContainer>
  );
}

const CollectionTitle = () => {
  return (
    <h1 className="font-alice text-[75px] font-medium mb-4">
      Collection of Lists
    </h1>
  );
};

const CollectionPageContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="w-full h-5/6 flex flex-col">
      <div className="w-full min-h-full p-4 pb-0 text-center flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};
