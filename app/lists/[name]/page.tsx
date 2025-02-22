interface ListParams {
    params: {
      name: string;
    };
  }

export default function List({ params }: ListParams) {
    return (
        <div> 
            {/* TODO: Make sure that the user is valid */}
            <h1>Show the list {params.name}</h1>
        </div>
    )
}