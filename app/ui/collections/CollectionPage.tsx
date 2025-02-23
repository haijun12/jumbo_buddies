import CollectionList from "./CollectionList"
import { CreateButton } from "./CreateButton"

export function CollectionPage() {
  return (
    <div className="w-full flex flex-col m-5">
      <CollectionList className="w-3/4"/>
      <div className="w-full flex justify-end">
        <CreateButton />
      </div>
    </div>
  )
}