import  DefaultBtn from "../components/Button/DefaultBtn";

export default {
    title: "Components/DefaultBtn",
    component: DefaultBtn,
    argTypes: {
        handleClick: {
            action: "handleClick"
        }
    }
}

const Template = args => <DefaultBtn {...args} />

export const Red = Template.bind({})
Red.args = {
    backgroundColor: "red",
    label: "Press Me",
    size: "md",
}

export const Yellow = Template.bind({})
Yellow.args = {
    backgroundColor: "yellow",
    label: "Press Me",
    size: "md",
}

export const Small = Template.bind({})
Small.args = {
    backgroundColor: "red",
    label: "Press Me",
    size: "sm",
}

export const Large = Template.bind({})
Large.args = {
    backgroundColor: "red",
    label: "Press Me",
    size: "lg",
}