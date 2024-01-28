/* eslint-disable react/prop-types */
const Button = ({onClick, children}) => {
    return (
        <button
            onClick={onClick}
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white bg-blue-500 shadow-sm hover:bg-blue-900"
          >
            {children}
        </button>
    )
}

export default Button