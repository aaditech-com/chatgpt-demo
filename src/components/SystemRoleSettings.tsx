import { Show } from 'solid-js'
import IconEnv from './icons/Env'
import IconX from './icons/X'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement

  const handleButtonClick = () => {
    //props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setCurrentSystemRoleSettings("I want to do some interactive instruction. I want you to start explaining the concept of {topic} to me at a 10th grade level. Then stop, give me a multiple choice quiz, grade the quiz, and resume the explanation. If I get the quiz wrong, reduce the grade level by 3 for the explanation and language you use, making the language simpler. Otherwise increase it by three and make the language harder. Then quiz me again and repeat the process. Do not talk about the changing of the grade level. Don't give away the answer to the quiz before the user has chance to respond. Stop after you've asked each question to wait for the user to answer.")
    props.setSystemRoleEditing(false)
  }

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <Show when={props.canEdit()} fallback={<IconEnv />}>
                <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
              </Show>
              <span>System Role: </span>
            </div>
            <div class="mt-1">
              {props.currentSystemRoleSettings()}
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>Add System Role</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span>System Role:</span>
          </div>
          <p class="my-2 leading-normal text-sm op-50 dark:op-60">Gently instruct the assistant and set the behavior of the assistant.</p>
          <div>
            <textarea
              ref={systemInputRef!}
              placeholder="I want to do some interactive instruction. I want you to start explaining the concept of {topic} to me at a 10th grade level. Then stop, give me a multiple choice quiz, grade the quiz, and resume the explanation. If I get the quiz wrong, reduce the grade level by 3 for the explanation and language you use, making the language simpler. Otherwise increase it by three and make the language harder. Then quiz me again and repeat the process. Do not talk about the changing of the grade level. Don't give away the answer to the quiz before the user has chance to respond. Stop after you've asked each question to wait for the user to answer."
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
