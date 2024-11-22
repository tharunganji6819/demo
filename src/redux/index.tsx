import { createStore } from "redux";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

type AppState = {
  products: Product[];
};

const initialState: AppState = {
  products: [],
};

const appReducer = (
  state: AppState = initialState,
  action: { type: string; payload: any }
): AppState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = state.products.find(
        (item) => item.id === action.payload.id
      );

      if (product) {
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          products: [...state.products, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }

    case "INCREMENT_QUANTITY": {
      return {
        ...state,
        products: state.products.map((each) =>
          each.id === action.payload
            ? { ...each, quantity: each.quantity + 1 }
            : each
        ),
      };
    }

    case "DECREMENT_QUANTITY": {
      const product = state.products.find((item) => item.id === action.payload);

      if (product && product.quantity > 1) {
        return {
          ...state,
          products: state.products.map((each) =>
            each.id === product.id
              ? { ...each, quantity: each.quantity - 1 }
              : each
          ),
        };
      } else if (product && product.quantity === 1) {
        return {
          ...state,
          products: state.products.filter((item) => item.id !== action.payload),
        };
      }
      return state;
    }

    default:
      return state;
  }
};

const store = createStore(appReducer);

export default store;
