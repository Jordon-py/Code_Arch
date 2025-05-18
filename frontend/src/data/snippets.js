export const snippets = [
    {
        name: "Hello World",
        description: "Print a simple greeting message.",
        code: `print("Hello, World!")`,
    },
  {
    name: "If/Else: Basic Check",
    description: "Conditional check: print different messages based on a variable.",
    code: `x = 10\nif x > 5:\n    print("x is greater than 5")\nelse:\n    print("x is 5 or less")`,
    language: "python",
    category: "Conditional Statements",
    module: "Control Flow",
    tags: [{ label: "if", color: "#facc15" }, { label: "else", color: "#facc15" }],
  },
  {
    name: "Loop Over List",
    description: "Iterate over a list and print each value.",
    code: `numbers = [1, 2, 3]\nfor num in numbers:\n    print(num)`,
    language: "python",
    category: "Loops",
    module: "Control Flow",
    tags: [{ label: "loop", color: "#10b981" }, { label: "list", color: "#10b981" }]
  },
  {
    name: "Function: Greet User",
    description: "Define and call a function with a parameter.",
    code: `def greet(name):\n    print(f"Hello, {name}!")\ngreet("Alice")`,
    language: "python",
    category: "Functions",
    module: "General",
    tags: [{ label: "function", color: "#818cf8" }]
  },
  {
    name: "Simple Authentication",
    description: "Prompt for username and check credentials.",
    code: `username = input("Username: ")\nif username == "admin":\n    print("Access granted")\nelse:\n    print("Access denied")`,
    language: "python",
    category: "Input/Validation",
    module: "Auth",
    tags: [{ label: "auth", color: "#f472b6" }]
  },
  {
    name: "Error Handling: Division by Zero",
    description: "Handle division by zero using try-except.",
    code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("You can't divide by zero!")`,
    language: "python",
    category: "Error Handling",
    module: "Control Flow",
    tags: [{ label: "try", color: "#f87171" }]
  },
  {
    name: "Get User Input (Name)",
    description: "Ask user for their name and greet them.",
    code: `name = input("Enter your name: ")\nprint(f"Hello, {name}!")`,
    language: "python",
    category: "User Input",
    module: "Forms",
    tags: [{ label: "input", color: "#38bdf8" }]
  },
  {
    name: "Write to a File",
    description: "Save a string to a text file using context manager.",
    code: `with open("output.txt", "w") as f:\n    f.write("Hello World!")`,
    language: "python",
    category: "File IO",
    module: "Storage",
    tags: [{ label: "file", color: "#fbbf24" }, { label: "write", color: "#fbbf24" }]
  },
  {
    name: "Read from a File",
    description: "Read and print file contents with context manager.",
    code: `with open("output.txt") as f:\n    content = f.read()\n    print(content)`,
    language: "python",
    category: "File IO",
    module: "Storage",
    tags: [{ label: "file", color: "#fbbf24" }, { label: "read", color: "#fbbf24" }]
  },
  {
    name: "Check Empty List",
    description: "Print a message if a list is empty.",
    code: `items = []\nif not items:\n    print("List is empty")`,
    language: "python",
    category: "Conditional Statements",
    module: "Control Flow",
    tags: [{ label: "empty", color: "#a3e635" }, { label: "list", color: "#a3e635" }]
  },
  {
    name: "Lambda: Add Numbers",
    description: "Create a lambda function for quick addition.",
    code: `add = lambda x, y: x + y\nprint(add(3, 5))`,
    language: "python",
    category: "Functions",
    module: "General",
    tags: [{ label: "lambda", color: "#38bdf8" }]
  }
]
