export default function InputElement(props) {
    const { label, tokenName, isBtn} = props;
    return (
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          
          <input
            type="text"
            name="price"
            id="price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-base lg:text-2xl border-gray-300 rounded-md"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
              {
                  isBtn && <div className="font-bold text-gray-700 mx-2">All</div>
              }
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
                id="currency"
                name="currency"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
            </select>
          </div>
        </div>
      </div>
    )
}