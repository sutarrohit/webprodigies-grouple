"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NEXORA_CONSTANTS } from "@/constants"
import Link from "next/link"
import { UseFormRegister } from "react-hook-form"
import "swiper/css/bundle"
import { SwiperProps, SwiperSlide } from "swiper/react"
import { Slider } from "../slider"
import { GroupListItem } from "./list-item"

type Props = {
    overlay?: boolean
    label?: string
    register?: UseFormRegister<any>
    selected?: string
    route?: string
} & SwiperProps

export const GroupListSlider = ({
    overlay,
    label,
    register,
    selected,
    route,
    ...rest
}: Props) => {
    return (
        <Slider
            slidesPerView={"auto"}
            spaceBetween={10}
            loop
            freeMode
            label={label}
            overlay={overlay}
            {...rest}
        >
            {NEXORA_CONSTANTS.groupList.map((item, i) => (
                <SwiperSlide key={item.id} className="content-width-slide mt-1">
                    {!register ? (
                        route ? (
                            <Link href={`/explore/${item.path}`}>
                                <GroupListItem {...item} selected={selected} />
                            </Link>
                        ) : (
                            <GroupListItem {...item} />
                        )
                    ) : (
                        i > 0 && (
                            <Label htmlFor={`item-${item.id}`}>
                                <span>
                                    <Input
                                        id={`item-${item.id}`}
                                        type="radio"
                                        className="hidden"
                                        value={item.path}
                                        {...register("category")}
                                    />
                                    <GroupListItem
                                        {...item}
                                        selected={selected}
                                    />
                                </span>
                            </Label>
                        )
                    )}
                </SwiperSlide>
            ))}
        </Slider>
    )
}
