import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react'

const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem('zverse_cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, size, color, qty } = action.payload
      const key = `${product.id}-${size}-${color}`
      const existing = state.find((i) => i.key === key)
      if (existing) {
        return state.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      }
      return [
        ...state,
        {
          key,
          id: product.id,
          name: product.name,
          code: product.code,
          price: product.price,
          mrp: product.mrp,
          size,
          color,
          qty,
        },
      ]
    }
    case 'REMOVE':
      return state.filter((i) => i.key !== action.key)
    case 'SET_QTY':
      return state.map((i) => (i.key === action.key ? { ...i, qty: Math.max(1, action.qty) } : i))
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadCart)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    localStorage.setItem('zverse_cart', JSON.stringify(items))
  }, [items])

  const notify = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }

  const addToCart = (product, size, color, qty = 1) => {
    dispatch({ type: 'ADD', payload: { product, size, color, qty } })
    notify(`${product.name} added to bag`)
  }
  const removeFromCart = (key) => dispatch({ type: 'REMOVE', key })
  const setQty = (key, qty) => dispatch({ type: 'SET_QTY', key, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const count = items.reduce((n, i) => n + i.qty, 0)
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, setQty, clearCart, count, subtotal, toast, notify }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
