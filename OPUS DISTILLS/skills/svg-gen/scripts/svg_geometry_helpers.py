#!/usr/bin/env python3
"""
SVG Geometry Helpers for Mathematical 2D Vector Construction
Generates 100% closed paths (ending in Z/z) with zero live strokes.
Designed for 15+ MP canvases (4000x4000, 5000x5000, 5000x3000).
"""

import math
from typing import List, Tuple


def fmt(val: float) -> str:
    """Format floating point coordinate cleanly."""
    return f"{val:.2f}"


def rect_path(x: float, y: float, w: float, h: float, rx: float = 0.0, ry: float = 0.0) -> str:
    """
    Generate a 100% closed path for a rectangle with optional rounded corners.
    Never produces <rect>; always produces closed <path d='... Z'/>.
    """
    if rx <= 0 and ry <= 0:
        return f"M {fmt(x)},{fmt(y)} H {fmt(x + w)} V {fmt(y + h)} H {fmt(x)} Z"

    rx = min(rx, w / 2.0)
    ry = min(ry if ry > 0 else rx, h / 2.0)

    p = [
        f"M {fmt(x + rx)},{fmt(y)}",
        f"H {fmt(x + w - rx)}",
        f"A {fmt(rx)},{fmt(ry)} 0 0 1 {fmt(x + w)},{fmt(y + ry)}",
        f"V {fmt(y + h - ry)}",
        f"A {fmt(rx)},{fmt(ry)} 0 0 1 {fmt(x + w - rx)},{fmt(y + h)}",
        f"H {fmt(x + rx)}",
        f"A {fmt(rx)},{fmt(ry)} 0 0 1 {fmt(x)},{fmt(y + h - ry)}",
        f"V {fmt(y + ry)}",
        f"A {fmt(rx)},{fmt(ry)} 0 0 1 {fmt(x + rx)},{fmt(y)}",
        "Z"
    ]
    return " ".join(p)


def circle_path(cx: float, cy: float, r: float) -> str:
    """
    Generate a 100% closed circular path using two 180-degree arcs.
    Never produces <circle>; always produces closed <path d='... Z'/>.
    """
    return (
        f"M {fmt(cx - r)},{fmt(cy)} "
        f"A {fmt(r)},{fmt(r)} 0 1 0 {fmt(cx + r)},{fmt(cy)} "
        f"A {fmt(r)},{fmt(r)} 0 1 0 {fmt(cx - r)},{fmt(cy)} Z"
    )


def ring_compound_path(cx: float, cy: float, r_outer: float, r_inner: float) -> str:
    """
    Generate a compound donut ring path with fill-rule='evenodd'.
    Zero live strokes: outer circle minus inner circle hole.
    """
    outer = (
        f"M {fmt(cx - r_outer)},{fmt(cy)} "
        f"A {fmt(r_outer)},{fmt(r_outer)} 0 1 0 {fmt(cx + r_outer)},{fmt(cy)} "
        f"A {fmt(r_outer)},{fmt(r_outer)} 0 1 0 {fmt(cx - r_outer)},{fmt(cy)} Z"
    )
    inner = (
        f"M {fmt(cx - r_inner)},{fmt(cy)} "
        f"A {fmt(r_inner)},{fmt(r_inner)} 0 1 0 {fmt(cx + r_inner)},{fmt(cy)} "
        f"A {fmt(r_inner)},{fmt(r_inner)} 0 1 0 {fmt(cx - r_inner)},{fmt(cy)} Z"
    )
    return f"{outer} {inner}"


def capsule_path(cx: float, cy: float, length: float, thickness: float, vertical: bool = False) -> str:
    """
    Generate a closed pill/capsule ribbon. Replaces unexpanded lines with thick stroke-width.
    """
    r = thickness / 2.0
    if not vertical:
        x1 = cx - length / 2.0 + r
        x2 = cx + length / 2.0 - r
        return (
            f"M {fmt(x1)},{fmt(cy - r)} H {fmt(x2)} "
            f"A {fmt(r)},{fmt(r)} 0 0 1 {fmt(x2)},{fmt(cy + r)} "
            f"H {fmt(x1)} "
            f"A {fmt(r)},{fmt(r)} 0 0 1 {fmt(x1)},{fmt(cy - r)} Z"
        )
    else:
        y1 = cy - length / 2.0 + r
        y2 = cy + length / 2.0 - r
        return (
            f"M {fmt(cx - r)},{fmt(y1)} "
            f"A {fmt(r)},{fmt(r)} 0 0 1 {fmt(cx + r)},{fmt(y1)} "
            f"V {fmt(y2)} "
            f"A {fmt(r)},{fmt(r)} 0 0 1 {fmt(cx - r)},{fmt(y2)} "
            f"Z"
        )


def polygon_path(points: List[Tuple[float, float]]) -> str:
    """Generate a closed path from arbitrary polygon vertices."""
    assert len(points) >= 3, "Polygon must have at least 3 vertices"
    d = [f"M {fmt(points[0][0])},{fmt(points[0][1])}"]
    for pt in points[1:]:
        d.append(f"L {fmt(pt[0])},{fmt(pt[1])}")
    d.append("Z")
    return " ".join(d)


def checkmark_path(cx: float, cy: float, size: float, thickness: float) -> str:
    """
    Generate a solid 2D checkmark polygon. Replaces open polyline checks.
    """
    scale = size / 100.0
    t = thickness / 2.0
    # Base canonical checkmark coordinates scaled and offset
    pts = [
        (-35 * scale, 5 * scale - t),
        (-10 * scale, -20 * scale),
        (35 * scale, -55 * scale),
        (45 * scale, -45 * scale),
        (-10 * scale, 20 * scale),
        (-45 * scale, -15 * scale),
    ]
    return polygon_path([(cx + x, cy + y) for x, y in pts])


def shield_half_path(width: float, top_y: float, shoulder_y: float, bottom_y: float, left: bool = True) -> str:
    """
    Generate half of a symmetrical cybersecurity shield (left or right).
    Enables dual-tone corporate shading (light half / shadow half).
    """
    w = width if not left else -width
    return (
        f"M 0.00,{fmt(top_y)} "
        f"L {fmt(w)},{fmt(shoulder_y)} "
        f"V {fmt(shoulder_y + 800)} "
        f"C {fmt(w)},{fmt(shoulder_y + 1540)} {fmt(w * 0.57)},{fmt(bottom_y - 220)} 0.00,{fmt(bottom_y)} "
        f"Z"
    )
