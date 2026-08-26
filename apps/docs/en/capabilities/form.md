# Forms

`useForm` from `@vea/hooks` manages values, validation, dirty state, submission, and reset. It is not coupled to Element Plus and does not introduce a configuration-driven form DSL. Sign-in pages, dialog forms, and mobile forms can share the same logic while retaining their own layout and interactions.

## Basic usage

```ts
import { required, useForm } from '@vea/hooks'

interface LoginForm {
  username: string
  password: string
}

const { state, actions } = useForm<LoginForm>({
  initialValues: {
    username: 'admin',
    password: 'admin'
  },
  rules: {
    username: required('Please enter your username'),
    password: [
      required('Please enter your password'),
      (value) => (value.length < 5 ? 'The password must be at least 5 characters' : undefined)
    ]
  }
})

const signIn = () =>
  actions.submit(async (values) => {
    await login(values)
  })
```

Element Plus is responsible only for rendering:

```vue
<el-form @submit.prevent="signIn">
  <el-form-item :error="state.errors.value.username?.[0]">
    <el-input
      :model-value="state.values.value.username"
      @update:model-value="actions.setValue('username', $event)"
      @blur="actions.validateField('username')"
    />
  </el-form-item>

  <el-button native-type="submit" :loading="state.submitting.value">
    Sign in
  </el-button>
</el-form>
```

The project's sign-in and registration pages already follow this pattern.

## State

| State                  | Meaning                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `values`               | Current field values                                       |
| `errors`               | An array of error messages for each field                  |
| `touchedFields`        | Fields that have been touched or validated                 |
| `dirtyFields`, `dirty` | Fields changed from their initial values and overall state |
| `hasErrors`            | Whether any field currently has an error                   |
| `validating`           | Whether validation is running                              |
| `submitting`           | Whether the form is being submitted                        |
| `submitError`          | The error thrown by the submit handler                     |
| `submitCount`          | Number of submission attempts                              |

## Actions

| Action                   | Purpose                                                   |
| ------------------------ | --------------------------------------------------------- |
| `setValue(field, value)` | Updates one field                                         |
| `setValues(partial)`     | Merges multiple fields                                    |
| `touch(fields)`          | Marks fields as touched                                   |
| `validateField(field)`   | Validates one field                                       |
| `validate()`             | Validates all fields with configured rules in parallel    |
| `setErrors(errors)`      | Applies server-side or business validation errors         |
| `clearErrors(fields?)`   | Clears selected errors or all errors                      |
| `submit(handler)`        | Runs the handler after successful validation              |
| `reset(values?)`         | Restores initial values or replaces them for the next use |

## Validators

A validator receives the current field value and all form values. It may return one error, multiple errors, no error, or a Promise:

```ts
const confirmPassword = (value: string, values: RegisterForm) => {
  return value === values.password ? undefined : 'The passwords do not match'
}

const uniqueUsername = async (value: string) => {
  const exists = await checkUsername(value)
  return exists ? 'This username is already in use' : undefined
}
```

A field can have multiple validators. If asynchronous validations race, only the latest result is written to state; a slower stale result cannot overwrite newer input.

`required()` treats `null`, `undefined`, whitespace-only strings, and empty arrays as empty values. The error message can be a string or a function; use a function to read an i18n message at runtime:

```ts
password: required(() => t('common.required'))
```

## Server-side errors

When the request reaches the server but some fields are invalid, apply the errors to their corresponding fields:

```ts
try {
  await actions.submit(save)
} catch (error) {
  if (isValidationError(error)) {
    actions.setErrors(error.fields)
  }
}
```

The Request layer still handles global network errors. `setErrors` is only for business feedback associated with specific fields.

## Submission and duplicate prevention

`submit()` enters the submitting state before running full-form validation. Calling it again while a submission is in progress immediately returns `undefined`, so binding the button to `state.submitting` is enough to prevent double submission.

The handler receives a shallow copy of the current values instead of a mutable form object.

## Reset

```ts
actions.reset() // Restore the values passed when useForm was created
actions.reset(user) // Replace the initial values, for example when editing another record
```

Reset also clears errors, touched state, the submission error, and asynchronous-validation versions.

## Responsibility boundaries

The current implementation uses shallow comparison and shallow copies for top-level fields. Mutating a nested object internally may not be detected by `dirtyFields`; for complex nested models, replace the entire field or flatten the form in the business layer.

Do not wrap the hook in another `BaseForm` merely to remove a few lines of template code. Move interaction logic into a hook only when multiple applications genuinely share it; leaving presentation structure in the page is easier to maintain.
