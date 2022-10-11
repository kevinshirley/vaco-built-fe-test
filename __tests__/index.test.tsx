import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../pages'
import { wrapper } from '../src/store'
import Search from '../src/components/common/search';

describe('Home', () => {
  it('renders Home component', () => {
    const HomeWithRedux = wrapper.withRedux(Home)
    render(<HomeWithRedux />)
    const homeElement = screen.getByTestId('home-component')
    expect(homeElement).toBeInTheDocument()
  })
  
  it('`onSearchChanged` triggered when search input value change', async () => {
    const onSearchChanged = jest.fn();

    const { getByPlaceholderText } = render(
      <Search placeholder='Search stocks' value="" onChange={onSearchChanged} />
    );
    
    const stockSymbolInputEl = getByPlaceholderText(/Search stocks/i)
    
    fireEvent.change(stockSymbolInputEl, { target: { value: 'AAPL' } })

    expect(onSearchChanged).toHaveBeenCalledTimes(1)
  })
})
