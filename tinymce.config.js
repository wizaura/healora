// config/tinymce.config.js

const tinymceConfig = {
    height: 400,
    menubar: false,
    plugins: "link image code lists table preview",
    toolbar:
        "undo redo | styles | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code preview",
    content_style: "body { font-family:Inter, sans-serif; font-size:14px }",

    // ✅ Allow all elements and attributes so TinyMCE doesn’t strip your HTML
    valid_elements: "*[*]",
    forced_root_block: "",
    cleanup: true,
    convert_urls: false,
};

export default tinymceConfig;