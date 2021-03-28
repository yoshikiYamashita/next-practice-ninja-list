//tell NEXT how many html pages need to be made based on our data.
export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  const paths = data.map(ninja => {
    return {
      params: {id: ninja.id.toString()}
    }
  });

  // paths -> NEXT will know how many pages to create based on this.
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  return {
    props: { ninja: data }
  }
}


const Details = ({ ninja }) => {
  return (  
    <div>
      <h1>{ninja.name}</h1>
      <p>{ninja.email}</p>
      <p>{ninja.website}</p>
      <p>{ninja.address.city}</p>
    </div>
  );
}
 
export default Details;