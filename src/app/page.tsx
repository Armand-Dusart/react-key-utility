import List from "./ui/components/List";

export default function Home() {
  return (
    <div className={"p-4 w-full h-full"}>
      <div className={"max-w-5xl mx-auto relative"}>
        <div className="absolute bottom-12 right-0 pointer-events-none drop-shadow-lg">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_104_40)">
              <path
                d="M100.254 200C97.0998 200 94.4337 197.716 93.6699 194.656C91.2352 184.903 86.5744 174.531 79.6875 163.542C71.5278 150.347 59.8958 138.108 44.7917 126.823C31.6549 116.894 18.5181 110.123 5.38138 106.511C2.27005 105.656 0 102.897 0 99.6702V99.6702C0 96.5066 2.18273 93.7795 5.22473 92.9109C18.1045 89.2335 30.5122 83.2631 42.4479 75C56.1632 65.4514 67.6215 53.993 76.8229 40.625C84.9629 28.7165 90.5507 16.9388 93.5863 5.29207C94.3815 2.24095 97.0676 0 100.221 0V0C103.409 0 106.114 2.29058 106.89 5.3833C108.642 12.3654 111.38 19.512 115.104 26.8229C119.792 35.8507 125.781 44.5312 133.073 52.8646C140.538 61.0243 148.872 68.4028 158.073 75C170.097 83.5231 182.32 89.5111 194.744 92.964C197.792 93.8109 200 96.5244 200 99.6874V99.6874C200 102.898 197.725 105.634 194.629 106.483C186.754 108.642 178.648 112.124 170.313 116.927C160.243 122.83 150.868 129.861 142.187 138.021C133.507 146.007 126.389 154.427 120.833 163.281C113.933 174.293 109.267 184.745 106.837 194.639C106.083 197.708 103.413 200 100.254 200V200Z"
                fill="url(#paint0_linear_104_40)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_104_40"
                x1="27.5"
                y1="19"
                x2="149"
                y2="174.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fd646e" />
                <stop offset="1" stopColor="#e27c7e" />
              </linearGradient>
              <clipPath id="clip0_104_40">
                <rect width="200" height="200" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="relative z-10 flex justify-between">
          <List />
        </div>
      </div>
    </div>
  );
}
