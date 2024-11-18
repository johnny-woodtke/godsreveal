#!/bin/bash

# Prompt for component name
echo "Enter component name:"
read component_name

# Run shadcn-ui add command
bunx --bun shadcn@latest add "$component_name"

# Append export statement to src/index.ts
echo "export * from \"./components/${component_name}\"\n" >> src/index.ts

echo "Component ${component_name} generated and exported successfully!"
