import { render } from '@testing-library/react'
import Home from '../pages'
import { wrapper } from '../src/store'

it('renders homepage unchanged', () => {
  const HomeWithRedux = wrapper.withRedux(Home)
  const { container } = render(<HomeWithRedux />)
  expect(container).toMatchSnapshot()
})