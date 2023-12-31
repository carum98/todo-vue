import { createApp, h } from 'vue'

export function useDialog(
    component,
    events,
    closeOnBackdrop = true
) {
    async function open(props) {
        const dialog = document.createElement('dialog')

        const target = document.createElement('div')
        dialog.appendChild(target)

        const { default: componentData } = await component()

        const app = createApp({
            render() {
                return h(componentData, {
                    ...props,
                    ...events,
                    onClose: () => dialog.close(),
                })
            }
        })

        app.mount(target)
        document.body.appendChild(dialog)

        dialog.showModal()

        dialog.addEventListener('close', () => {
            app.unmount()
            document.body.removeChild(dialog)
        })

        if (closeOnBackdrop) {
            // Close dialog when press backdrop
            dialog.addEventListener('click', (event) => {
                if (event.target === dialog) {
                    dialog.close()
                }
            })
        }

        return app
    }

    return {
        open
    }
}