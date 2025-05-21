import { FC } from 'hono/jsx';
import { html } from 'hono/html';
import { inputClasses } from '../style/inputClasses';
import { buttonClasses } from '../style/buttonClasses';

const InputForm: FC = ({ props }) => {
  return (
    <>
      <form
        id="name-input-form"
        hx-post="/partials/hello"
        hx-target="#hello-container"
        hx-replace="innerHTML"
        hx-on-htmx-after-request="document.querySelector('#name-input').value=''" >
        <p class="text-md text-black font-bold">
          Enter your name:
        </p>
        <div class="flex flex-row item-center justify-center text-center space-x-4">
          <input 
            id="name-input"
            class={inputClasses}
            name="inputName"
          />

          <button
            id="submit-button"
            class={buttonClasses}
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
   </>
  )
}

export default InputForm;
