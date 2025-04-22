import {motion} from "framer-motion";

export default function HamburgerMenuButton({active = false, color}) {
    return (
        <motion.button
            className="relative bg-white/0 flex flex-col gap-2 p-2"
            initial={false}
            animate={active ? 'opened' : 'close'}
        >
            <motion.span
                variants={top}
                className={`h-0.5 bg-[${color}] w-5 inline-block`}
            />
            <motion.span
                variants={center}
                className={`h-0.5 bg-[${color}] w-5 inline-block`}
            />
            <motion.span
                variants={bottom}
                className={`h-0.5 bg-[${color}] w-5 inline-block`}
            />
        </motion.button>
    )
}

const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 10,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -10,
    },
  };