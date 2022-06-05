import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
const client = new ApolloClient({
  uri: 'https://b2cdemo.getswift.asia/graphql',
  cache: new InMemoryCache()
});
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
