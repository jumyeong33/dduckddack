import { Notify } from "quasar";

const alretMapping = {
    install: {
        message : "Please Install Metamask extention for continue..",
        position: 'top',
        actions: [{ label: 'Install', color: 'white', handler: () => { window.location.href = 'https://metamask.io/download/' }}]
    },
    error: {message : "Something went wrong.. Try again!", position: 'center'},
    success: {message : "CREATEAD!", position: 'center'},
    loading: {message : "LOADING..", position: 'center'},
    rejectSign: {
        message : "Please connect again",
        caption: 'Rejected Sign to DDUCKDDACK..',
        position: 'top-right',
        color: 'yellow'
    },
    rejectSwitchChain: {
        message : 'Please switch network',
        caption: 'We Only support Polygon Chain Currently..',
        position: 'top-right',
        color: 'primary',
        icon: 'announcement',
        actions: [{ icon: 'close', round: true, color: 'black', }],
    }
};
export default function showNotify(state) {
    const options = alretMapping[state]
    Notify.create({ color :'primary', textColor: 'black', ...options,})
}
